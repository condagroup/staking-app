import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from 'wagmi';

export const ContentHeader: React.FC = () => {
  const { isConnected, address } = useAccount()
  return (
    <div className="headStyle">
      <div>
        <h1 className="pageName">Launchpad</h1>
        <div className="divider"></div>
      </div>
      <div className="d-flex justify-content-end">
        {
          (isConnected && address == "0x8F3a535e29C39F88c66B8317062cE33315f2253E") && 
          <Link to="/launchpad/manage" className="headLink">
            <button className="actionButton">Manage Projects</button>
          </Link>
        }
        <Link to="/" className="headLink">
          <button className="actionButton">How to Join</button>
        </Link>
        <Link to="/" className="headLink">
          <button className="actionButton">Level System</button>
        </Link>
        <Link to="/" className="headLink">
          <button className="actionButton">Apply for IDO</button>
        </Link>
        <Link to="/" className="headLink">
          <button className="actionButton">FAQs</button>
        </Link>
      </div>
    </div>
  )
}