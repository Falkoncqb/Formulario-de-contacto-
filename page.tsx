"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    })

    setFormData({ nombre: "", telefono: "", email: "" })
    setIsSubmitting(false)
  }

  const portfolioItems = [
    {
      title: "E-Commerce Moderno",
      description: "Tienda online con pasarela de pagos",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Dashboard Empresarial",
      description: "Panel de control con analytics",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Landing Page SaaS",
      description: "Página de aterrizaje para software",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Portfolio Creativo",
      description: "Sitio web para artistas y diseñadores",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <pre className="absolute top-10 left-10 text-primary font-mono text-sm animate-float-code">
          {`def create_website():
    design = True
    modern = True
    return design`}
        </pre>
        <pre className="absolute top-32 right-20 text-accent font-mono text-xs animate-float-code-slow">
          {`class WebDesign:
    def __init__(self):
        self.modern = True
        self.responsive = True`}
        </pre>
        <pre className="absolute bottom-40 left-1/4 text-primary font-mono text-sm animate-float-code-fast">
          {`import creativity
from design import modern
from code import python`}
        </pre>
        <pre className="absolute top-1/2 right-10 text-accent font-mono text-xs animate-float-code-slow">
          {`for page in website:
    optimize(page)
    deploy(page)
    celebrate()`}
        </pre>
        <pre className="absolute bottom-20 right-1/3 text-primary font-mono text-sm animate-float-code">
          {`def improve_site(url):
    analyze(url)
    enhance(url)
    return optimized`}
        </pre>
        <pre className="absolute top-1/4 left-1/3 text-accent font-mono text-xs animate-float-code-fast">
          {`if client.happy:
    project.success()
else:
    improve.more()`}
        </pre>
        <pre className="absolute bottom-1/3 left-20 text-primary font-mono text-sm animate-float-code-slow">
          {`async def build():
    await design()
    await develop()
    return website`}
        </pre>
        <pre className="absolute top-2/3 right-1/4 text-accent font-mono text-xs animate-float-code">
          {`python = {
    'fast': True,
    'powerful': True,
    'elegant': True
}`}
        </pre>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              DISEÑAMOS TU SITIO WEB
              <br />
              <span className="text-primary">O LO MEJORAMOS</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
              Creamos experiencias web modernas y funcionales que impulsan tu negocio al siguiente nivel
            </p>
          </div>

          <Card className="max-w-2xl mx-auto p-8 bg-card/80 backdrop-blur-md border-border shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-foreground font-medium">
                  Nombre Completo
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-foreground font-medium">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  placeholder="+569 1234 5678"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  required
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 shadow-lg hover:shadow-primary/50 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVIANDO..." : "PONERME EN CONTACTO"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Nuestros Proyectos</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Sitios web que hemos creado para nuestros clientes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/20"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">© 2025 FunnelATF. Todos los derechos reservados.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
