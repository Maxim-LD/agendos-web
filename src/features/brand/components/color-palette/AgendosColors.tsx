"use client"

const colors = [
  { name: "Electric Blue", hex: "#007AFF" },
  { name: "Vibrant Orange", hex: "#FF7A00" },
  { name: "Charcoal Black", hex: "#1E1E1E" },
  { name: "Soft Gray", hex: "#F8F9FA" },
]

export const AgendosColors = () => (
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold text-gray-800 font-montserrat">Color Palette</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {colors.map(({ name, hex }) => (
        <div key={name} className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-2xl shadow-md" style={{ backgroundColor: hex }} />
          <span className="text-xs font-medium text-gray-600">{name}</span>
          <span className="text-[10px] text-gray-400">{hex}</span>
        </div>
      ))}
    </div>
  </section>
)
