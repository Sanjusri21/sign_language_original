import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, User } from "lucide-react";

export function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("Sanjusri");
  const [email, setEmail] = useState("sanjusri2321@gmail.com");
  const [bio, setBio] = useState("AI & DS Student");

  const handleSave = () => {
  const profile = {
    name,
    email,
    bio,
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  alert("Profile Updated Successfully!");
  navigate("/profile");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] text-white p-8">
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 mb-8"
      >
        <ArrowLeft />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl mx-auto bg-glass-bg border border-glass-border rounded-3xl p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User size={50} />
          </div>
        </div>

        <h2 className="text-3xl text-center mb-8">
          Edit Profile
        </h2>

        <div className="space-y-5">

          <div>
            <label>Name</label>
            <input
              className="w-full mt-2 p-3 rounded-xl bg-input-background"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              className="w-full mt-2 p-3 rounded-xl bg-input-background"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Bio</label>
            <textarea
              className="w-full mt-2 p-3 rounded-xl bg-input-background"
              rows={4}
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Save Changes
          </button>

        </div>
      </motion.div>
    </div>
  );
}