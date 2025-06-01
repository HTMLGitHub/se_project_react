import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { coordinates, apiKey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../Modal/AddItemModal/AddItemModal";
import ItemModal from "../Modal/ItemModal/ItemModal";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import LoginModal from "../Modal/LoginModal/LoginModal";
import RegisterModal from "../Modal/RegisterModal/RegisterModal";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import EditProfileModal from "../Modal/EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import { set } from "mongoose";

export default function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    description: "",
    condition: "",
    isDay: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthChecked && !isLoggedIn && location.state?.openRegisterModal) {
      setActiveModal("register");
      
      // Clear state so it does not reopen on every navigation
      window.history.replaceState({}, document.title);
    }
  }, [location, isAuthChecked, isLoggedIn]);

  function handleSubmit(request, onSuccess) {
    setIsSaving(true);
    request()
      .then((res) => {
        if(onSuccess) {onSuccess(res);}
        closeActiveModal();
      })
      .catch(async (err) => {
        if (typeof err === "string") {
          console.error("Error:", err);
        }
        else if (err instanceof Response) {
          const errorText = await err.text();
          console.error("Server responded with:",errorText);
        }
        else {
          console.error("Unexpected error:", err);
        } 
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  const handleCardLike = ({_id, isLiked}) => {
    const token = localStorage.getItem("jwt");
    const apiMethod = isLiked ? api.removeCardLike : api.addCardLike;
    apiMethod(_id, token)
      .then((newCard) => {
        setClothingItems((oldCards) =>
          oldCards.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch(console.error);
  }

  const handleEditProfile =({name, avatar}) => {
    const makeRequest = () => api.updateUserProfile({name, avatar}, token);
    const onSuccess = setCurrentUser;
    handleSubmit(makeRequest, onSuccess);
  }

  const handleRegister = ({ name, avatar, email, password }) => {
    auth.register({ name, avatar, email, password })
      .then(() => {
        setActiveModal("login");
      })
      .catch(async (err)=>{
        console.error("Register error", err);

        let errorMessage = "An error occurred. Please try again.";

        if(err instanceof Response) {
          try {
            const errorData = await err.json(); // safe check for json error method
            
            if (errorData?.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.warn("Error parsing JSON", jsonError);
          }
        } else if (err?.message) {
          errorMessage = err.message;
        }

        if(
          errorMessage.includes("Email already exists") || 
          errorMessage.includes("11000") || 
          errorMessage.includes("409")) {
            setRegisterError("Email is already registered");
        } else {
          setRegisterError(errorMessage);
        }
      });
    };

  const handleLogin = ({ email, password }) => {
    return auth.login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        setLoginError("");
        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login error", err);
        setLoginError("Invalid email or password");
      });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) { // Save token to state
      setToken(storedToken);
      auth.checkToken(storedToken)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token check failed", err);
          setIsLoggedIn(false);
        }).finally(() => {
          setIsAuthChecked(true);
        });
    }
    else {
      setIsAuthChecked(true);
    }
  }, []);

  const handleAddItemModal = ({ name, imageUrl, weatherType }) => {
    console.log("Submitting item:", { name, imageUrl, weather: weatherType });

    const makeRequest = () => api.addItem({name, weather: weatherType, imageUrl}, token);
  

    const onSuccess = (newItem) => {
      setClothingItems((oldClothes) => [newItem, ...oldClothes]);
    }

    handleSubmit(makeRequest, onSuccess);      
  };

  const handleCardClick = (card) => {
    if(!card)return;
    
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevTemp) => (prevTemp === "F" ? "C" : "F"));
  };

  const handleDeleteItem = (id) => {
    api.deleteItem(id, token)
      .then(() => {
        setClothingItems((oldClothes) =>
          oldClothes.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData({
          ...filteredData,
          temp: {
            F: Number(filteredData.temp.F),
            C: Number(filteredData.temp.C),
          },
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api.getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setToken("");
    closeActiveModal();
    setClothingItems([]);

    navigate("/", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header 
              handleAddClick={handleAddClick}
              handleRegisterClick={() => setActiveModal("register")}
              handleLoginClick={() => setActiveModal("login")}
              weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      onEditProfile={() => {
                        setActiveModal("edit-profile");
                      }}  
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    /> 
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CurrentTemperatureUnitContext.Provider>

          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          onAddItemModal={handleAddItemModal}
          isSaving={isSaving}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          onDeleteItem={handleDeleteItem}
        />

        <LoginModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onLogin={handleLogin}
          isSaving={isSaving}
          setActiveModal={setActiveModal}
          loginError={loginError}
        />

        <RegisterModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onRegister={handleRegister}
          isSaving={isSaving}
          setActiveModal={setActiveModal}
          registerError={registerError}
        />

        <EditProfileModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onEditProfile={handleEditProfile}
          isSaving={isSaving}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
