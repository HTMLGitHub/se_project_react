import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { v4 } from 'uuid';
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
    setIsSaving(true);
    api.updateUserProfile({name, avatar}, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Update profile error", err);
      })
      .finally(() => {
        setIsSaving(false);
      }
    );
  }

  const handleRegister = ({ name, avatar, email, password }) => {
    auth.register({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err)=>{
        console.error("Register error", err);
      });
    };

  const handleLogin = ({ email, password }) => {
    auth.login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Login error", err);
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
        });
    }
  }, []);

  const handleAddItemModal = ({ name, imageUrl, weatherType }) => {
    setIsSaving(true);

    const newID = v4();

    api.addItem({ _id: newID, name, weather: weatherType, imageUrl}, token)
      .then(() => {
        setClothingItems((oldClothes) => [
          { _id: newID, name: name, weather: weatherType, imageUrl: imageUrl },
          ...oldClothes
        ]);
        setIsSaving(false);
        // close the modal
        closeActiveModal();
      })
      .catch(console.error);
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
        />

        <RegisterModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onRegister={handleRegister}
          isSaving={isSaving}
          setActiveModal={setActiveModal}
        />

        <EditProfileModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onEditProfile={handleEditProfile}
          isSaving={isSaving}
          currentUser={currentUser}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
