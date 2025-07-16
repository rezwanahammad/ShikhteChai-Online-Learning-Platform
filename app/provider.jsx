// "use client";
// import { useUser } from '@clerk/nextjs';
// import axios from 'axios';
// import React, { useEffect } from 'react';

// const Provider = ({ children }) => {

//   const {user} = useUser();
//   useEffect(() => {
//    user && CreateNewUser();
//   }, [user])

//   async function CreateNewUser() {

//     const result = await axios.post('/api/user', {
//       name: user?.fullName,
//       email: user?.primaryEmailAddress?.emailAddress,
//     });
//     console.log(result.data);
//   }

//   return (
//     <div>
//       {children}
//     </div>
//   );
// };

// export default Provider;



"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect } from 'react';

const Provider = ({ children }) => {

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  async function CreateNewUser() {
    // Construct name with fallback
    const name = user?.fullName?.trim()
      || `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
      || "Unnamed User";

    const email = user?.primaryEmailAddress?.emailAddress;

    console.log("Creating user with:", { name, email });

    // 🔴 Update Clerk user profile if name fields are missing
    if (!user.firstName || !user.lastName) {
      const fullNameParts = name.split(" ");
      const firstName = fullNameParts[0] || "Unnamed";
      const lastName = fullNameParts.slice(1).join(" ") || "User";

      try {
        await user.update({
          firstName,
          lastName
        });
        console.log("✅ Updated Clerk user profile with:", { firstName, lastName });
      } catch (error) {
        console.error("❌ Failed to update Clerk user profile:", error);
      }
    }

    if (!email) {
      console.error("❌ No email found for user. Skipping user creation.");
      return;
    }

    try {
      const result = await axios.post('/api/user', {
        name,
        email,
      });
      console.log("✅ User creation API response:", result.data);
    } catch (error) {
      console.error("❌ Error creating user:", error);
    }
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default Provider;

