import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";
export default function PlanSelection() {
  const router = useRouter();
  async function NextAuth() {
    router.push("/payment");
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-6 border-b border-gray-200">
        <div className="w-32">
          <Image
            src="/netflix-logo.svg"
            alt="Netflix"
            width={120}
            height={40}
            priority
          />
        </div>
        <a
          href="#"
          className="text-lg font-medium text-gray-800 hover:underline"
        >
          Sign Out
        </a>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-1">STEP 1 OF 2</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Choose the plan that's right for you
          </h1>
        </div>

        {/* Plan Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Mobile Plan */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-800 to-blue-500 flex items-center justify-center p-4">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold">Mobile</h3>
                <p>480p</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">₹149</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Video and sound quality</p>
                <p className="font-medium">Fair</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Resolution</p>
                <p className="font-medium">480p</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Supported devices</p>
                <p className="font-medium">Mobile phone, tablet</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">
                  Devices your household can watch at the same time
                </p>
                <p className="font-medium">1</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Download devices</p>
                <p className="font-medium">1</p>
              </div>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="border rounded-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-1 font-medium">
              Most Popular
            </div>
            <div className="h-24 bg-gradient-to-r from-blue-700 to-blue-400 flex items-center justify-center p-4 mt-7">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold">Basic</h3>
                <p>720p</p>
              </div>
            </div>
            <div className="p-4 space-y-4 relative">
              <div className="absolute top-4 right-4 text-purple-600">
                <CheckCircle className="w-5 h-5" />
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">₹199</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Video and sound quality</p>
                <p className="font-medium">Good</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Resolution</p>
                <p className="font-medium">720p (HD)</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Supported devices</p>
                <p className="font-medium">
                  TV, computer, mobile phone, tablet
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">
                  Devices your household can watch at the same time
                </p>
                <p className="font-medium">1</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Download devices</p>
                <p className="font-medium">1</p>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-indigo-800 to-indigo-500 flex items-center justify-center p-4">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold">Standard</h3>
                <p>1080p</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">₹499</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Video and sound quality</p>
                <p className="font-medium">Great</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Resolution</p>
                <p className="font-medium">1080p (Full HD)</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Supported devices</p>
                <p className="font-medium">
                  TV, computer, mobile phone, tablet
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">
                  Devices your household can watch at the same time
                </p>
                <p className="font-medium">2</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Download devices</p>
                <p className="font-medium">2</p>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-indigo-900 via-purple-800 to-red-600 flex items-center justify-center p-4">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold">Premium</h3>
                <p>4K + HDR</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Monthly price</p>
                <p className="font-medium">₹649</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Video and sound quality</p>
                <p className="font-medium">Best</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Resolution</p>
                <p className="font-medium">4K (Ultra HD) + HDR</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">
                  Spatial audio (immersive sound)
                </p>
                <p className="font-medium">Included</p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Supported devices</p>
                <p className="font-medium">
                  TV, computer, mobile phone, tablet
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Devices your household can watch at the same time
                </p>
                <p className="font-medium">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              NextAuth();
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-12 rounded"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
