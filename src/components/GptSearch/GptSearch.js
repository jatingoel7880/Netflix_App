import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BACK_LOGO  } from '../../utils/constants'

const GptSearch = () => {
  return (
    <div> 
      <div className="fixed -z-10 ">
        <img src={BACK_LOGO} alt="logo" />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch