import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import Section, { SectionColumn, SectionRow } from "../../layouts/section";
import Link from "next/link";

const Footer: NextPage = () => {
    return (
        <React.Fragment>
            <div className='line mt-3 mb-3 w-full'></div>
            <div className="grid justify-items-center">
                <SectionRow className="mt-8">
                    <span className="landingPageText04 mr-3 cursor-pointer transform transition duration-500 hover:scale-110">About Us</span>
                    <span className="landingPageText04 mr-3 cursor-pointer transform transition duration-500 hover:scale-110">Help Center</span>
                    <span className="landingPageText04 mr-3 cursor-pointer transform transition duration-500 hover:scale-110">Terms of Service</span>
                    <span className="landingPageText04 mr-3 cursor-pointer transform transition duration-500 hover:scale-110">Privacy Policy</span>
                    <span className="landingPageText04 mr-3 cursor-pointer transform transition duration-500 hover:scale-110">Blog</span>
                </SectionRow>
                <span className="landingPageText04 mr-3 mt-2">© 2023 Davids Rock.</span>
            </div>
            <br />
        </React.Fragment>
    );
};

export default Footer;
