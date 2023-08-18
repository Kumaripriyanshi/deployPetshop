import React, { useEffect, useState } from "react";
import axios from "axios";
export const Test = () => {
  const [firstData, setFirstData] = useState("");

  const firstLink = async () => {
   
    try {
      const link2 = await axios.get("cgi-bin/uniqueid/mrzp");
      document.getElementById("link2").innerText = link2.data.substring(1,200);

      const link3 = await axios.get("verifyAadhaar");
      document.getElementById("link3").innerText = link3.data.substring(1,200);;

      const link1 = await axios.get("products/single-address");
      document.getElementById("link1").innerText = link1.data.substring(1,200);;

     
    } catch (error) {
      console.log(error);
    }

   

  };

  useEffect(() => {
    firstLink();
    // console.log("Hello",firstData)
  }, []);

  return (
    <>
     <table>  
    <tr>  
        <th>http://www.highprogrammer.com/cgi-bin/uniqueid/mrzp</th>  
        <th>https://myaadhaar.uidai.gov.in/verifyAadhaar</th>  
        <th>https://www.smarty.com/products/single-address</th>  
    </tr>  
  
    <tr>  
        <td id="link1"></td>  
        <td id="link2"></td>  
        <td id="link3"></td>  
    </tr> 

     
   
</table>  
    </>
  );
};
