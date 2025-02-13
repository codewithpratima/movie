"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    singer: "",
    cast: "",
    releaseDate: "",
    budget: "",
  });
  const router = useRouter();

  const [message, setMessage] = useState("");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // Create the movie
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          singer: form.singer,
          cast: form.cast.split(","),
          releaseDate: form.releaseDate,
          budget: Number(form.budget),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const movieId: string = data._id; // Ensure _id is extracted correctly
        console.log(`Movie ID: ${movieId}`);
        // Ensure movieId is not empty
        if (!movieId || typeof movieId !== "string") {
          setError("Invalid movie ID format.");
          return;
        }

        // Now call handleUpload to upload the video with movieId
        handleUpload(movieId); // Pass movieId to the video upload function
        setMessage("Movie added successfully!");
        // router.push("/"); // Optionally navigate to another page
      } else {
        setMessage("Failed to add movie.");
      }
    } catch (error) {
      setMessage("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (movieId: string) => {
    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }

    setLoading(true);
    setError("");

    // Check if the movieId is valid
    if (!movieId || typeof movieId !== "string") {
      setError("Invalid movie ID.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("movieId", movieId); // Ensure movieId is a valid string

    try {
      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setVideoUrl(data.videoUrl);
      } else {
        setError(data.error || "Failed to upload video");
      }
    } 
    catch (error) {
      setError("Error uploading video");
    }
     finally {
      setLoading(false);
    }


    try {
      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } 
    catch (error) {
      setError("Error uploading image");
    }
     finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setImageFile(file);
      setError(""); // Clear any previous error
    }
  };

  return (
    <div className="h-screen w-full bg-black justify-center items-center flex">
      <br />
      <div className="p-4 max-w-lg bg-white ">
        <h1 className="text-2xl font-bold mb-4">Add Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Movie Name"
            className="border p-2 w-full"
            required
          />
          <input
            name="cast"
            value={form.cast}
            onChange={handleChange}
            placeholder="Cast"
            className="border p-2 w-full"
            required
          />
          <input
            name="singer"
            value={form.singer}
            onChange={handleChange}
            placeholder="singer"
            className="border p-2 w-full"
            required
          />
          <input
            name="releaseDate"
            type="date"
            value={form.releaseDate}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            placeholder="Budget"
            className="border p-2 w-full"
            required
          />

          {/* Video Upload Section */}
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            onClick={() => videoFile && handleUpload(form.name)} // Remove this
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>

          {videoUrl && (
            <div className="video-preview">
              <h3>Uploaded Video:</h3>
              <video controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* <button
            type="submit"
            className="bg-red-600 py-3 hover:bg-green-700 text-white focus:bg-grenn-700 p-2 w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Movie"}
          </button> */}




          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            onClick={() =>imageFile && handleUpload(form.name)} // Remove this
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

          {imageUrl && (
            <div className="image-preview">
              <h3>Uploaded Image:</h3>
              <picture>
  <source srcSet={imageUrl} type="image/webp" />
  <source srcSet={imageUrl} type="image/png" />
  <img src={imageUrl} alt="Description of the image" />
</picture>

            </div>
          )}

          <button
            type="submit"
            className="bg-red-600 py-3 hover:bg-green-700 text-white focus:bg-grenn-700 p-2 w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {message && (
          <p className="mt-3 text-center text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
}
