import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Battery from "../../components/shared/Battery";
import { Icon, Image } from "../../utils/general";
import "./back.scss";

export const Background = () => {
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(img/wallpaper/${wall.src})`,
      }}
    ></div>
  );
};

export const BootScreen = (props) => {
  const dispatch = useDispatch();
  const wall = useSelector((state) => state.wallpaper);
  const [blackout, setBlackOut] = useState(false);

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log("blackout");
        setBlackOut(true);
      }, 4000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        if (wall.act === "restart") {
          setTimeout(() => {
            setBlackOut(false);
            setTimeout(() => {
              dispatch({ type: "WALLBOOTED" });
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout]);

  return (
    <div className="bootscreen">
      <div className={blackout ? "hidden" : ""}>
        <Image src="asset/bootlogo" w={180} />
        <div className="mt-48" id="loader">
          <svg
            className="progressRing"
            height={48}
            width={48}
            viewBox="0 0 16 16"
          >
            <circle cx="8px" cy="8px" r="7px"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const LockScreen = (props) => {
  const wall = useSelector((state) => state.wallpaper);
  const [lock, setLock] = useState(false);
  const [unlocked, setUnLock] = useState(false);
  const [password, setPass] = useState("");
  const [passType, setType] = useState(1); // 1 pour mot de passe, 0 pour PIN
  const [forgot, setForget] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Gestion des erreurs de mot de passe
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.setting.person.name);

  const action = (e) => {
    var act = e.target.dataset.action;

    if (act === "splash") setLock(true);
    else if (act === "inpass") {
      var val = e.target.value;
      if (!passType) {
        // Si c'est un PIN, limiter à 4 chiffres
        val = val.substring(0, 4);
        val = !Number(val) ? "" : val;
      }

      setPass(val); // Mise à jour de la valeur du champ
    } else if (act === "forgot") setForget(true); // Gestion de l'oubli
    else if (act === "pinlock") setType(0); // Changer en mode PIN
    else if (act === "passkey") setType(1); // Changer en mode mot de passe

    if (act === "pinlock" || act === "passkey") setPass(""); // Réinitialiser le champ de saisie
  };

  const proceed = () => {
    const correctPassword = "1234";

    if (password === correctPassword) {
      // Si le mot de passe est correct
      setUnLock(true);
      setErrorMessage(""); // Pas d'erreur si le mot de passe est correct
      setTimeout(() => {
        dispatch({ type: "WALLUNLOCK" });
      }, 1000);
    } else {
      // Si le mot de passe est incorrect
      setErrorMessage("Mot de passe incorrect, veuillez réessayer.");
    }
  };

  const action2 = (e) => {
    if (e.key === "Enter") proceed(); // Validation avec la touche Entrée
  };

  return (
    <div
      className={"lockscreen " + (props.dir === -1 ? "slowfadein" : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url(${`img/wallpaper/lock.jpg`})`,
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className="splashScreen mt-40" data-faded={lock}>
        <div className="text-6xl font-semibold text-gray-100">
          {new Date().toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="fadeinScreen" data-faded={!lock} data-unlock={unlocked}>
        <Image
          className="rounded-full overflow-hidden"
          src="img/asset/prof.jpg"
          w={200}
          ext
        />
        <div className="mt-2 text-2xl font-medium text-gray-200">
          {userName}
        </div>

        {/* Premier bouton "Se connecter" */}
        <div className="flex items-center mt-6 signInBtn" onClick={proceed}>
          Se connecter
        </div>

        {/* Champ de mot de passe */}
        <div className="flex flex-col items-center mt-6 w-full">
          <input
            type={passType ? "text" : "password"}
            value={password}
            onChange={action}
            data-action="inpass"
            onKeyDown={action2}
            placeholder={passType ? "Mot de passe" : "PIN"}
            className="signInBtn passwordInput mt-2 p-2 text-center"
          />
        </div>

        {/* Message d'erreur */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        {/* Changement du texte en fonction de l'état "forgot" */}
        <div
          className="text-xs text-gray-400 mt-4 handcr"
          onClick={() => setForget(!forgot)}
        >
          {!forgot
            ? `J'ai oublié mon ${passType ? "password" : "pin"}`
            : "Force à toi -1000 aura"}
        </div>
      </div>
      <div className="bottomInfo flex">
        <Icon className="mx-2" src="wifi" ui width={16} invert />
        <Battery invert />
      </div>
    </div>
  );
};
