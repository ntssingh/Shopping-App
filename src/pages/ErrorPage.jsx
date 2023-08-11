import React from 'react'
import { Link } from "react-router-dom";
import styles from '../styles/styles'

const ErrorPage = () => {
  return (
    <div>
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

        <h1>404-Page not found</h1>
        <br /><br />

        <div className={`${styles.button}`}>
            <Link to="/">
              <h1 className="text-[#fff] flex items-center">
                Go to Homepage
                
              </h1>
            </Link>
          </div>

    </div>
    </div>

  )
}

export default ErrorPage