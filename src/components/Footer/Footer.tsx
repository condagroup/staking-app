import React from "react"
import "./Footer.scss"

export const Footer: React.FC = () => {
  return (
    <div className="d-flex justify-content-center pb-3">
      <div className="root">
        <a className="item" href="https://github.com/" target="_blank" rel="noreferrer">
          Github
        </a>
        <a className="item" href="https://twitter.com/" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a className="item" href="https://t.me/" target="_blank" rel="noreferrer">
          Telegram
        </a>
        <a className="item" href="https://discord.gg/" target="_blank" rel="noreferrer">
          Discord
        </a>
      </div>
    </div>
  )
}
