import { Header } from '../components/Header'
import { Heart, Github, Linkedin, Mail } from 'lucide-react'

export function CreatorsScreen() {
  const creators = [
    {
      name: 'Equipe NaPraça',
      role: 'Desenvolvedores',
      description: 'Plataforma de escola de negócios gamificada para microempreendedores',
      email: 'contato@napraca.com.br',
      github: 'https://github.com/napraca',
      linkedin: 'https://linkedin.com/company/napraca',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Criadores" />
      
      <div className="p-4">
        <div className="text-center mb-8 pt-8">
          <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
            <Heart className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NaPraça</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Uma plataforma inovadora que conecta microempreendedores e consumidores locais,
            oferecendo uma experiência gamificada de aprendizado e crescimento.
          </p>
        </div>

        <div className="space-y-6">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-600">
                  {creator.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{creator.name}</h2>
              <p className="text-primary-600 font-medium mb-3">{creator.role}</p>
              <p className="text-gray-600 text-sm mb-4">{creator.description}</p>

              <div className="flex justify-center gap-4">
                {creator.email && (
                  <a
                    href={`mailto:${creator.email}`}
                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {creator.github && (
                  <a
                    href={creator.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {creator.linkedin && (
                  <a
                    href={creator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 NaPraça. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}

