export default function Growth() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 items-center">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Visualize your professional self 10-20 years from now.
      </h1>
      <h2 className="text-xl text-center mb-8">What does your growth look like?</h2>
      <form className="flex flex-col space-y-4 items-center">
        {/* Wrapper div to control the width of all radio button labels equally */}
        <div className="w-full max-w-md space-y-4">
          {[
            "I'm an expert in a specific field, known for my specialized knowledge",
            "I'm a versatile professional with wide-ranging knowledge in many fields",
            "I'm running my own business",
            "Not sure",
          ].map((option, index) => (
            <label key={index} className="block w-full text-center">
              <input className="sr-only peer" name="growth" required type="radio" />
              <div className="text-lg py-4 px-6 border-2 border-gray-300 rounded-md peer-checked:border-blue-500 peer-checked:bg-blue-50 cursor-pointer">
                {option}
              </div>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
}
