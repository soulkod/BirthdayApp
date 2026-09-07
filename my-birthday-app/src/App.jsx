import React, { useState, useEffect } from 'react';
import photo1 from './assets/img1.JPG';
import photo2 from './assets/img2.jpg';
import photo3 from './assets/img3.JPG';
import photo4 from './assets/img4.jpg';
import photo5 from './assets/img5.jpg';
import photo6 from './assets/img6.JPG';
import photo7 from './assets/img7.JPG';
import photo8 from './assets/img8.JPG';
import photo9 from './assets/img9.JPG';
import photo10 from './assets/img10.JPG';
import photo11 from './assets/img11.JPG';
import photo12 from './assets/img12.JPG';
import photo13 from './assets/img13.JPG';
import wrongimg from './assets/wrongimg.png';
import logo from './assets/main.png';


const BACKGROUND_IMAGES = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
  photo13

];

const BIRTHDAY_DATE = "2026-09-12T00:00:00";
const SECRET_GIFT = "trip to paris";

const HINTS = [
  "It is not sold in the stores...",
  "It's something that will make you feel like a queen 👑",
  "Aowa ..."
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [guess, setGuess] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");

  // Cycle through background images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, []);

  // Update birthday countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(BIRTHDAY_DATE) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (guess.trim().toLowerCase() === SECRET_GIFT.toLowerCase()) {
      setIsCorrect(true);
      setMessage("Wow! You got it my love! You deserve it!");
    } else {
      setMessage("O zamile... that's not it! Try again!");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden text-white">
      {/* Slideshow Background Layers */}
      {BACKGROUND_IMAGES.map((imgUrl, index) => (
        <div
          key={imgUrl}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px)',
            transform: 'scale(1.08)',
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 1,
          }}
        />
      ))}



      {/* Main Glassmorphism Card */}
      <div
        className="card border-0 text-white text-center   bg-transparent p-4 p-md-5 my-4 position-relative"
        style={{
          maxWidth: '500px',
          width: '90%',

          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          borderRadius: '20px',
          border: '0px solid rgba(255, 255, 255, 0.25)',
          zIndex: 3,
        }}
      >
        <div className="d-flex justify-content-center align-items-center w-100 mb-3 bg-transparent"
          style={{ width: '100px', height: '100px' }}
        >
          <img
            src={logo}
            className="img-fluid rounded-3 d-justify-content-center bg-transparent"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
        <h1 className="fw-bold mb-4 fs-2">🍾🥂Vee's Birthday 🎉🎂 </h1>

        {timeLeft ? (
          <div className="row g-2 mb-4">
            <div className="col-3">
              <div className="bg-dark bg-opacity-50 p-2 rounded-3">
                <span className="fs-3 fw-bold d-block">{timeLeft.days}</span>
                <small className="text-uppercase small opacity-75">Days</small>
              </div>
            </div>
            <div className="col-3">
              <div className="bg-dark bg-opacity-50 p-2 rounded-3">
                <span className="fs-3 fw-bold d-block">{timeLeft.hours}</span>
                <small className="text-uppercase small opacity-75">Hours</small>
              </div>
            </div>
            <div className="col-3">
              <div className="bg-dark bg-opacity-50 p-2 rounded-3">
                <span className="fs-3 fw-bold d-block">{timeLeft.minutes}</span>
                <small className="text-uppercase small opacity-75">Mins</small>
              </div>
            </div>
            <div className="col-3">
              <div className="bg-dark bg-opacity-50 p-2 rounded-3">
                <span className="fs-3 fw-bold d-block">{timeLeft.seconds}</span>
                <small className="text-uppercase small opacity-75">Secs</small>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="display-6 text-warning fw-bold mb-4">🎂 Happy Birthday! 🎉</h2>
        )}




        <div>
          <hr className="border-light opacity-25 my-4" />
          <div>

            <h2 className="fs-5 fw-bold mb-3">Can you guess your surprise? 🎁</h2>

            {isCorrect ? (
              <div className="alert alert-success border-0 bg-success bg-opacity-75 text-white fw-bold my-3">
                {message}
              </div>
            ) : (
              <form onSubmit={handleGuessSubmit} className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg fs-6"
                  placeholder="Type your guess..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                />
                <button className="btn btn-danger px-4 fw-bold" type="submit">
                  Guess
                </button>
              </form>
            )}

            {message && !isCorrect && (
              <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
                style={{

                  backdropFilter: 'blur(4px)',
                  zIndex: 1050
                }}
              >
                <div
                  className="card border-0 text-white bg-white shadow-lg p-4 text-center"
                  style={{
                    maxWidth: '380px',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '18px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center w-100 mb-3"
                    style={{ width: '100px', height: '100px' }}
                  >
                    <img
                      src={isCorrect ? logo : wrongimg}
                      alt={isCorrect ? "Success" : "Error"}
                      className="img-fluid rounded-3 d-justify-content-center"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <p className="fs-5 fw-bold mb-3 text-black">{message}</p>

                  <button
                    type="button"
                    className="btn bg-dark text-white rounded-pill px-4 fw-bold mx-auto"
                    onClick={() => setMessage("")}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {!isCorrect && (
              <div className="mt-3">
                {hintLevel < HINTS.length && (
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm rounded-pill px-3"
                    onClick={() => setHintLevel(hintLevel + 1)}
                  >
                    💡 Unlock Hint ({hintLevel}/{HINTS.length})
                  </button>
                )}

                <div className="mt-3 text-start">
                  {HINTS.slice(0, hintLevel).map((hint, idx) => (
                    <div
                      key={idx}
                      className="p-2 mb-2 bg-white bg-transparent rounded-3 small"
                    >
                      <strong>Hint {idx + 1}:</strong> {hint}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}