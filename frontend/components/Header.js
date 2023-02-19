
import React from 'react';
import { Navbar } from 'flowbite-react';

export default function Header() {
  return (
    <div className="bg-slate-800">
      <Navbar
        fluid={true}
        rounded={true}
        className="bg-slate-800 shadow-md text-slate-300"
      >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            jo bhi proj name hai
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="text-slate-300 ">
          <Navbar.Link href="/verifiedOrgList" className="text-slate-300 ">
            <div className="hover:text-slate-50">Verified Org</div>
          </Navbar.Link>
          <Navbar.Link href="/organisationList" className="text-slate-300 ">
            <div className="hover:text-slate-50">Unverified Org</div>
          </Navbar.Link>

          <Navbar.Link href="/reportedOrgsList" className="text-slate-300">
            <div className="hover:text-slate-50">Reported Org</div>
          </Navbar.Link>
          <Navbar.Link href="/checkStatus" className="text-slate-300">
            <div className="hover:text-slate-50">Check status</div>
          </Navbar.Link>
          <Navbar.Link href="/" className="text-slate-300">
            <div className="hover:text-slate-50">About Us</div>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
