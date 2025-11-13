import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false)
  const controls = useAnimation()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [15, -15])
  const rotateY = useTransform(x, [-50, 50], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    x.set(offsetX / 10)
    y.set(offsetY / 10)
  }

  const resetTilt = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    controls.start({
      background: [
        "radial-gradient(circle at 20% 30%, #4f46e5, transparent 50%)",
        "radial-gradient(circle at 80% 70%, #9333ea, transparent 50%)",
        "radial-gradient(circle at 40% 80%, #0ea5e9, transparent 50%)",
        "radial-gradient(circle at 20% 30%, #4f46e5, transparent 50%)",
      ],
      borderColor: ["#4f46e5", "#9333ea", "#0ea5e9", "#4f46e5"],
      boxShadow: [
        "0 0 40px 10px rgba(79,70,229,0.35)",
        "0 0 40px 10px rgba(147,51,234,0.35)",
        "0 0 40px 10px rgba(14,165,233,0.35)",
        "0 0 40px 10px rgba(79,70,229,0.35)",
      ],
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      },
    })
  }, [controls])

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center text-center h-[80vh] px-6"
    >
      <motion.div
        className="absolute inset-0 opacity-40 blur-3xl pointer-events-none"
        animate={controls}
      />

      <motion.div
        className="relative mx-auto mb-8 w-40 h-40 rounded-full overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          resetTilt()
          setIsHovering(false)
        }}
        onMouseEnter={() => setIsHovering(true)}
        style={{
          rotateX,
          rotateY,
          borderWidth: "4px",
          borderStyle: "solid",
        }}
        animate={controls}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img
          src="/dasd.jpg"
          alt="Juan Dejon"
          className="object-cover w-full h-full rounded-full"
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none"
          animate={{
            background: isHovering
              ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 70%)",
          }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4"
      >
        Hi, I’m <span className="text-blue-400">Juan Dejon</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg max-w-xl text-gray-300"
      >
        <span className="text-blue-400 font-bold mr-1">
          Full Stack Developer
        </span>
        crafting scalable, elegant, and impactful web experiences.
      </motion.p>

      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="px-5 py-2 rounded-full border border-gray-700 hover:border-indigo-400 hover:bg-indigo-600 mt-8"
      >
        View My Work
      </motion.a>
    </section>
  )
}
