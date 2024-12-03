"use client";

import { useEffect } from "react";

export default function TopmateWidget() {
  useEffect(() => {
    // Dynamically load the Topmate widget script
    const script = document.createElement("script");
    script.src = "https://topmate-embed.s3.ap-south-1.amazonaws.com/v1/topmate-embed.js";
    script.async = true;
    script.defer = true;

    // Add attributes for the Topmate widget
    script.setAttribute("user-profile", "https://topmate.io/embed/profile/shrey_tyagi?theme=D5534D");
    script.setAttribute(
      "btn-style",
      JSON.stringify({
        backgroundColor: "#000",
        color: "#fff",
        border: "1px solid #000",
      })
    );
    script.setAttribute("embed-version", "v1");
    script.setAttribute("button-text", "Let's Connect");
    script.setAttribute("position-right", "30px");
    script.setAttribute("position-bottom", "30px");
    script.setAttribute("custom-padding", "0px");
    script.setAttribute("custom-font-size", "16px");
    script.setAttribute("custom-font-weight", "500");
    script.setAttribute("custom-width", "200px");

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visual component, just injects the script
}
