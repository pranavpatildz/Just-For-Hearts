**Program Card Title:**
- Old: `<h3 className="text-lg md:text-xl font-semibold tracking-wide text-white">{column.top.title}</h3>`
- New: `<h3 className="text-base md:text-xl font-semibold tracking-wide text-white break-normal break-words">{column.top.title}</h3>`

**Card Description:**
- Old: `{column.top.text && <p className="leading-relaxed text-base md:text-base text-gray-700">{column.top.text}</p>}`
- New: `{column.top.text && <p className="leading-[1.3] text-sm md:text-base text-gray-700 break-normal break-words">{column.top.text}</p>}`

**Bullet Text (Top Card):**
- Old: `                        {bullet}`
- New: `                        {bullet && <span className="break-normal break-words">{bullet}</span>}`

**Bullet Text (Bottom Card):**
- Old: `                      {bullet}`
- New: `                      {bullet && <span className="break-normal break-words">{bullet}</span>}`

**Bullet List Container:**
- Old: `<ul className="list-none space-y-2 text-left text-sm md:text-base text-gray-700 leading-relaxed">`
- New: `<ul className="list-none space-y-1 text-left text-xs md:text-base text-gray-700 leading-[1.25]">`

**CTA Button:**
- Old: `<Link href={column.top.buttonLink} className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full px-4 md:px-6 py-2 md:py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300">`
- New: `<Link href={column.top.buttonLink} className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full px-3 md:px-6 py-1 md:py-3 text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300">`

**Top Card Container Padding:**
- Old: `<div className="px-4 md:px-8 py-4 md:py-8 space-y-2 md:space-y-4">`
- New: `<div className="px-3 md:px-8 py-3 md:py-8 space-y-2 md:space-y-4">`

**Top Card Container Border-radius & flex-grow:**
- Old: `<div className="w-full max-w-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden z-10">`
- New: `<div className="w-full max-w-sm flex-grow rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden z-10">`

**Bottom Card h3 Padding:**
- Old: `<h3 className={`text-lg md:text-xl font-bold mb-3 px-3 md:px-6 pt-3 md:pt-6 ${getColorClass(column.bottom.cardColor, 'text')} underline decoration-2 decoration-current`}>`
- New: `<h3 className={`text-lg md:text-xl font-bold mb-3 px-2 md:px-6 pt-2 md:pt-6 ${getColorClass(column.bottom.cardColor, 'text')} underline decoration-2 decoration-current`}>`

**Bottom Card p Padding:**
- Old: `{column.bottom.text && <p className="leading-relaxed text-gray-700 mb-3 px-3 md:px-6">{column.bottom.text}</p>}`
- New: `{column.bottom.text && <p className="leading-relaxed text-gray-700 mb-3 px-2 md:px-6">{column.bottom.text}</p>}`

**Bottom Card ul Padding:**
- Old: `<ul className="list-none space-y-1 text-left text-sm md:text-base text-gray-700 leading-relaxed px-3 md:px-6 pb-3 md:pb-6">`
- New: `<ul className="list-none space-y-1 text-left text-sm md:text-base text-gray-700 leading-relaxed px-2 md:px-6 pb-2 md:pb-6">`

**Bottom Card Container Border-radius & flex-grow:**
- Old: `<div className="w-full max-w-sm flex flex-col justify-start rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden border-t-4" style={{ borderColor: getColorClass(column.bottom.cardColor, 'border').replace('border-', '#') }}>`
- New: `<div className="w-full max-w-sm flex flex-col justify-start flex-grow rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm overflow-hidden border-t-4" style={{ borderColor: getColorClass(column.bottom.cardColor, 'border').replace('border-', '#') }}>`

**Grid Container Gap:**
- Old: `<div className="grid grid-cols-3 gap-4 md:gap-10">`
- New: `<div className="grid grid-cols-3 gap-3 md:gap-10">`

**Column Wrapper for Equal Heights:**
- Old: `            <div key={colIndex} className="flex flex-col items-center">`
- New: `            <div key={colIndex} className="flex flex-col justify-between items-stretch h-full">`
