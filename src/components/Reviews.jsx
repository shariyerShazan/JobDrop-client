import React from "react";

const reviews = [
  {
    id: 1,
    name: "Farhana Akter",
    role: "Job Seeker",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "JobDrop এর মাধ্যমে আমি আমার প্রথম ফুলটাইম চাকরিটা পাই। ব্যবহার করা খুব সহজ, ধন্যবাদ JobDrop টিমকে!",
  },
  {
    id: 2,
    name: "Hasan Mahmud",
    role: "Recruiter",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "সঠিক প্রার্থী খুঁজে পাওয়া এত সহজ হবে ভাবিনি। JobDrop সত্যিই এক অসাধারণ প্ল্যাটফর্ম!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Internship Seeker",
    photo: "https://randomuser.me/api/portraits/women/75.jpg",
    text: "ইন্টার্নশিপ খুঁজে পেতে আমার দারুণ সাহায্য করেছে JobDrop। এটা আমার ক্যারিয়ারের জন্য টার্নিং পয়েন্ট ছিল।",
  },
  {
    id: 4,
    name: "Rayhan Kabir",
    role: "Junior Developer",
    photo: "https://randomuser.me/api/portraits/men/64.jpg",
    text: "JobDrop made it super easy for me to apply to tech jobs. I love the clean UI and fast application process!",
  },
  {
    id: 5,
    name: "Salma Khatun",
    role: "HR Manager",
    photo: "https://randomuser.me/api/portraits/women/29.jpg",
    text: "Our hiring team relies on JobDrop for fresh talent. We’ve hired amazing candidates through this platform.",
  },
  {
    id: 6,
    name: "Imran Hossain",
    role: "Freelancer",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Thanks to JobDrop, I landed freelance gigs that matched my skillset. It’s a platform I now check every day.",
  },
];

function Reviews() {
  return (
    <section className=" py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-myPrimary mb-10">
          What People Say About JobDrop
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          {reviews.map(({ id, name, role, photo, text }) => (
            <div
              key={id}
              className="hover:shadow-2xl bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto transition-shadow duration-300 group"
            >
              <img
                src={photo}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-myPrimary group-hover:-translate-y-12 duration-500"
              />
              <p className="text-gray-700 italic mb-4 group-hover:-translate-y-12 duration-500">"{text}"</p>
              <h3 className="text-xl font-semibold text-myPrimary group-hover:-translate-y-12 duration-500">
                {name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:-translate-y-12 duration-500">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
