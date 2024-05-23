

import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../redux/configSlice";
import { SUPPORTED_LANGUAGES } from "../../utils/constants";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.config.lang);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    dispatch(changeLanguage(selectedLang));

    // Store the selected language preference in localStorage
    localStorage.setItem("selectedLanguage", selectedLang);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.identifier} value={lang.identifier}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
