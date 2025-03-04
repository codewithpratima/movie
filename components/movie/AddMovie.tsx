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
    setError("");

    try {
      const movieRes = await fetch("/api/movies", {
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

      if (!movieRes.ok) throw new Error("Failed to add movie.");
      const movieData = await movieRes.json();
      const movieId: string = movieData._id;

      if (!movieId || typeof movieId !== "string")
        throw new Error("Invalid movie ID format.");
      if (!videoFile) throw new Error("Please select a video file.");
      if (!imageFile) throw new Error("Please select an image file.");

      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("image", imageFile);
      formData.append("movieId", movieId);

      const uploadRes = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok)
        throw new Error(uploadData.error || "Failed to upload files.");

      setVideoUrl(uploadData.videoUrl);
      setImageUrl(uploadData.imageUrl);
      setMessage("Movie added and files uploaded successfully!");
    } catch (error: any) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setError("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setError("");
    }
  };

  return (
    // <div className="h-screen w-full bg-black flex justify-center items-center">
    <div className=" top-0 netflix-bg h-full w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 z-0">
        <div className="flex justify-center items-center h-screen w-full">
          <div className="p-4 max-w-lg bg-white">
            <h1 className="text-2xl font-bold mb-4">Add Movie</h1>

            {/* ✅ Fixed: `onSubmit={handleSubmit}` should not pass any arguments */}
            <form onSubmit={handleSubmit} className="space-y-3 z-1">
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
                placeholder="Singer"
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
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              {error && <div className="error-message">{error}</div>}

              {videoUrl && (
                <div className="video-preview">
                  <video controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />
              {imageUrl && (
                <div className="image-preview">
                  <picture>
                    <source srcSet={imageUrl} type="image/webp" />
                    <source srcSet={imageUrl} type="image/png" />
                    <img src={imageUrl} alt="Uploaded movie poster" />
                  </picture>
                </div>
              )}

              {/* ✅ Fixed: No need for `onClick` here, submission is handled by `onSubmit` */}
              <button
                type="submit"
                className="bg-red-600 py-3  text-white p-2 w-full"
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
      </div>
    </div>
  );
}
