Here are the corrected JSX sections from `Programs.tsx` related to bullet rendering:

**Top Card's bullet list (complete `ul` block):**
```tsx
                  <ul className="list-none space-y-1 text-left text-xs md:text-base text-gray-700 leading-[1.25] break-words">
                    {column.top.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="flex items-center gap-2">
                        <Check className={`w-4 h-4 ${getColorClass(column.top.cardColor, 'text')} flex-shrink-0`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
```

**Bottom Card's bullet list (complete `ul` block):**
```tsx
                <ul className="list-none space-y-1 text-left text-sm md:text-base text-gray-700 leading-relaxed px-2 md:px-6 pb-2 md:pb-6 break-words">
                  {column.bottom.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${getColorClass(column.bottom.cardColor, 'text')} flex-shrink-0`} />
                      {bullet}
                    </li>

                  ))}
                </ul>
```