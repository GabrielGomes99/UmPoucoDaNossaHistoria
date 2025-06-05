'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaHeart, FaEnvelope } from 'react-icons/fa'
import { Dancing_Script, Merriweather } from 'next/font/google'
import { useTheme } from '@/context/ThemeContext'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing-script',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})

const messages = [
  {
    id: 1,
    title: 'Quando quiser rir',
    content: `Oi meu amor, rir é uma das coisas que mais fazemos juntos, né? Sinto falta de escutar sua risada, ir de pertinho, de rir até a barriga doer e faltar ar! Não vejo a hora de estar com você de novo. Estou esperando sua ligação depois de ler essa página, hein! Quero rir junto e matar saudade dessa risada deliciosa hehehe. Te amo muito, amo a tua risada. É um dos meus sons preferidos no mundo todinho!
`,
  },
  {
    id: 2,
    title: 'Quando tiver com saudades',
    content: `Oi meu amor, também estou morrendo de saudades de você. Lembre-se sempre dos nossos momentos juntos, olhe nossas fotos, ouça as músicas que te lembram de mim. Pode me ligar a qualquer hora, mesmo que seja só para ouvir minha voz. É difícil ficar tanto tempo longe, né? Mas nosso amor é mais forte que qualquer distância. Lembre-se que logo logo estaremos juntos de novo, e que cada dia que passa é um dia a menos para o nosso reencontro. Te amo de todo meu coração, meu lindo! Estou contando os minutos para te ver.
  \nVocê é tudo pra mim, a melhor parte da minha vida.
`,
  },
  {
    id: 3,
    title: 'Quando se sentir sozinha',
    content: `Meu amor, sinto muito por você estar se sentindo dessa forma. E mesmo que você não esteja sozinho(a) meu pensamento não some! E agora esse livro, estarão sempre com você, quando eu não puder estar fisicamente. Eu te amo de todo meu coração e espero que não se sinta jamais assim depois dessa página. Ou jamais!!
\nEU TE AMO!
`,
  },
  {
    id: 4,
    title: 'Quando se sentir feliz',
    content: `EU ESTOU TÃO FELIZ POR VOCÊ ESTAR NESSA PÁGINA, MEU AMOR\nDEPOIS QUE PASSAR POR AQUI, ME LIGA PARA CONTAR SOBRE SEU DIA E O QUE TE FEZ FELIZ!!\nESSE SENTIMENTO QUE ESTÁ EM SEU CORPO É O MESMO QUE SINTO QUANDO PENSO EM VOCÊ. VOCÊ ME FAZ MUITO FELIZ
EU TE AMO MUITO, MEU LINDO! ESPERO QUE TODOS OS DIAS DA SUA VIDA, EM ALGUM (OU ALGUNS) MOMENTO(S) VOCÊ SINTA ISSO.\nCONTA COMIGO SEMPRE, PARA SE ALEGRAR OU CURTIR A FELICIDADE COM VOCÊ.`,
  },
  {
    id: 5,
    title: 'Quando estiver sem dormir',
    content: `Se o sono não vier, feche os olhos e pense em todos os nossos momentos juntos. Coloca aquele ASMR que você gosta de ouvir e lembre o quanto EU TE AMO, Espero que isso traga paz ao seu coração e um soninho gostoso. 😴\n\nBoa noite, meu amor!`,
  },
  {
    id: 6,
    title: 'Quando estiver brava',
    content: `Meu amor, sei que às vezes as coisas podem te deixar brava, até mesmo comigo. Só quero que saiba que te amo em todos os momentos, inclusive nesses. Quando quiser conversar, estarei aqui para te ouvir, te entender e te abraçar. Você é muito importante pra mim! ❤️`,
  },
  {
    id: 7,
    title: 'Quando estiver frustrada com trabalho',
    content: `Sei o quanto você se dedica e o quanto é incrível no que faz. O trabalho pode ser difícil, mas não define o seu valor. Você é maravilhosa, talentosa e merece todo reconhecimento. Se precisar de colo, desabafo ou só de um carinho, estou aqui sempre!`,
  },
  {
    id: 8,
    title: 'Quando nós estiver sem nos falar',
    content: `Às vezes a vida ou até mesmo as emoções nos afastam um pouquinho, mas meu amor por você nunca diminui. Sinto sua falta e quero sempre resolver tudo com carinho. Quando quiser, estarei aqui de braços abertos para recomeçar quantas vezes for preciso.`,
  },
  {
    id: 9,
    title: 'Quando estiver doente',
    content: `Queria poder cuidar de você em todos os momentos, principalmente quando não está se sentindo bem. Se cuida, meu amor! Estou torcendo pela sua recuperação e mandando todo meu carinho e energia positiva. Assim que melhorar, vou te encher de mimos!`,
  },
  {
    id: 10,
    title: 'Quando sentir vontade de chorar',
    content: `Chorar faz parte, meu amor. Não tenha vergonha de sentir. Se quiser, pode chorar no meu ombro, pode me ligar, pode só ficar em silêncio comigo. Eu te amo em todos os momentos, e quero ser seu porto seguro sempre.`,
  },
  {
    id: 11,
    title: 'Quando algo não sair do jeito que queira',
    content: `Nem sempre as coisas acontecem como planejamos, mas isso não diminui sua força e sua beleza. Você é incrível, mesmo nos dias difíceis. Estou aqui para te apoiar, te animar e te lembrar do quanto você é capaz!`,
  },
  {
    id: 12,
    title: 'Quando for seu aniversário',
    content: `Feliz Aniversário, meu amor! Hoje é um dia muito especial, pois é o dia em que o mundo ganhou você, a pessoa mais incrível que eu conheço. Você merece todo o amor, toda a felicidade e todas as coisas boas que a vida pode oferecer. Que este novo ano de vida traga ainda mais alegrias, conquistas e momentos especiais. Você é uma pessoa única, com um coração enorme e uma capacidade incrível de fazer as pessoas ao seu redor felizes. Te amo mais do que as palavras podem expressar! ❤️`,
  },
  {
    id: 13,
    title: 'Quando for Natal',
    content: `Feliz Natal, meu amor! Que este Natal seja tão especial quanto você é para mim. Que possamos celebrar o amor, a união e a magia desta data tão especial juntos. Você é o melhor presente que eu poderia ter recebido na vida. Que este Natal traga muita alegria, paz e momentos inesquecíveis para nós. Te amo mais do que as luzes de Natal e mais do que todos os presentes do mundo! ❤️`,
  },
  {
    id: 14,
    title: 'Quando for Ano Novo',
    content: `Feliz Ano Novo, meu amor! Que este novo ano traga ainda mais amor, felicidade e momentos especiais para nós. Que possamos continuar construindo nossa história juntos, com muito amor, carinho e cumplicidade. Você é a melhor parte do meu ano, e ter você ao meu lado é o maior presente que eu poderia ter. Te amo mais do que as estrelas no céu e mais do que todos os fogos de artifício do mundo! ❤️`,
  },
  {
    id: 15,
    title: 'Quando estiver entediada',
    content: `Oi meu amor, sei que às vezes a vida pode parecer um pouco monótona, mas quero que você saiba que você é a pessoa mais interessante que eu conheço! Que tal a gente fazer algo diferente? Pode me ligar a qualquer hora, podemos conversar, rir, contar histórias, ou até mesmo fazer um encontro virtual para assistir algo juntos. Você nunca está sozinha, e eu sempre estou aqui para te animar e fazer seu dia mais especial. Te amo muito! ❤️`,
  },
  {
    id: 16,
    title: 'Quando precisar de um abraço',
    content: `Meu amor, sinto muito que você esteja precisando de um abraço. Queria poder estar aí agora para te abraçar forte e te fazer sentir protegida e amada. Mas mesmo à distância, quero que você saiba que meu amor por você é como um abraço constante, que te envolve e te protege. Você é muito especial para mim, e eu estou sempre aqui para você, mesmo que seja só para ouvir você desabafar. Te amo mais do que as palavras podem expressar! ❤️`,
  },
  {
    id: 17,
    title: 'Quando quiser saber minha memória favorita',
    content: `Meu amor, é impossível escolher apenas uma memória favorita com você, pois cada momento ao seu lado se torna especial e único. Desde os pequenos gestos até as grandes aventuras, cada instante com você se transforma em uma lembrança preciosa que guardo no meu coração. Seja o nosso primeiro encontro, nossos aniversários juntos, nossas viagens, ou até mesmo aqueles momentos simples de ficar em casa assistindo um filme, tudo se torna uma memória especial quando estou com você. Você é a pessoa que torna cada momento da minha vida mais bonito e significativo. Te amo muito! ❤️`,
  },
  {
    id: 18,
    title: 'Quando precisar de motivação',
    content: `Meu amor, você é a razão do meu sorriso todos os dias. Sua força, determinação e amor me inspiram a ser uma pessoa melhor. Cada desafio que enfrentamos juntos me faz perceber o quanto somos capazes quando estamos unidos. Você é minha maior motivação para continuar crescendo e evoluindo. Lembre-se sempre do quanto você é especial, do quanto você é capaz e do quanto você é amada. Eu acredito em você e estou sempre aqui para te apoiar em todos os seus sonhos e objetivos. Você é incrível e merece todo o sucesso do mundo! Te amo muito! ❤️`,
  },
]

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen py-12 px-4 pb-20 transition-colors duration-500 ${isDark ? 'dark dark-mode-bg' : 'light light-mode-bg'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className={`text-4xl md:text-5xl font-bold text-center text-pink-600 mb-12 ${dancingScript.className}`}>
          Leia-me quando precisar de mim
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white rounded-lg p-6 shadow-lg cursor-pointer"
              onClick={() => setSelectedMessage(message.id)}
            >
              <div className="flex items-center gap-4 mb-4">
                <FaEnvelope className="text-3xl text-pink-500" />
                <h3 className={`text-xl font-semibold text-gray-800 ${dancingScript.className}`}>
                  {message.title}
                </h3>
              </div>
              <p className={`text-gray-600 line-clamp-3 ${merriweather.className}`}>
                {message.content.split('\n')[0]}
              </p>
            </motion.div>
          ))}
        </div>

        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-semibold text-gray-800 ${dancingScript.className}`}>
                  {messages.find((m) => m.id === selectedMessage)?.title}
                </h3>
                <FaHeart className="text-2xl text-pink-500" />
              </div>
              <div className="prose prose-lg">
                <pre className={`whitespace-pre-wrap font-sans text-gray-600 ${merriweather.className}`}>
                  {messages.find((m) => m.id === selectedMessage)?.content}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 