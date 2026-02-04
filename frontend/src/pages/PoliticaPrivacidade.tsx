import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4 px-4 py-3 max-w-2xl mx-auto">
          <Link
            to="/cadastro"
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors text-foreground"
            aria-label="Voltar ao cadastro"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-bold text-lg text-foreground">Política de Privacidade</h1>
        </div>
      </header>

      <main className="px-4 py-6 pb-12 max-w-2xl mx-auto prose prose-sm prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground text-xs mb-6">
          Última atualização: Janeiro de 2026. Versão 1.0.
        </p>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">1. Introdução</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A NaPraça (“nós”, “nosso” ou “Plataforma”) está comprometida com a proteção da sua privacidade. Esta Política de Privacidade 
            descreve quais dados pessoais coletamos, como os utilizamos, com quem podemos compartilhá-los e quais são os seus direitos, 
            em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018) e demais normas aplicáveis no Brasil.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">2. Dados que Coletamos</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Coletamos apenas os dados necessários para oferecer e melhorar nossos serviços:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
            <li><strong className="text-foreground">Cadastro e conta:</strong> nome completo, e-mail, senha (armazenada de forma criptografada), tipo de perfil (consumidor ou empreendedor) e, quando informado, telefone.</li>
            <li><strong className="text-foreground">Perfil de empreendedor:</strong> dados do negócio (nome, endereço, categoria, descrição, telefone, fotos/logo, catálogo de produtos ou serviços, publicações no feed).</li>
            <li><strong className="text-foreground">Localização:</strong> endereço e coordenadas (latitude/longitude) do negócio para exibição no mapa; opcionalmente, localização do dispositivo do consumidor para “perto de mim” e experiência no mapa.</li>
            <li><strong className="text-foreground">Uso da Plataforma:</strong> eventos como visualizações de perfil de negócio, cliques e favoritos, para analytics e melhoria do serviço (ex.: contagem de visualizações para o empreendedor).</li>
            <li><strong className="text-foreground">Avaliações:</strong> quando o consumidor avalia um negócio, armazenamos a nota, o texto (opcional) e a data, vinculados ao seu perfil e ao negócio.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">3. Finalidade do Tratamento</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Utilizamos seus dados para:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
            <li>Fornecer e operar o aplicativo (cadastro, login, mapa, perfil do negócio, missões, recompensas, catálogo e feed).</li>
            <li>Exibir negócios no mapa e permitir que consumidores descubram e avaliem estabelecimentos.</li>
            <li>Mostrar ao empreendedor estatísticas de visualizações, cliques e favoritos relacionados ao seu negócio.</li>
            <li>Melhorar a experiência do usuário, a segurança e a qualidade dos nossos serviços.</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">4. Base Legal (LGPD)</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            O tratamento dos seus dados pessoais está fundamentado, conforme o caso, na execução de contrato ou de medidas pré-contratuais 
            (prestação do serviço), no legítimo interesse (melhoria do serviço, analytics e segurança) e, quando aplicável, no seu 
            consentimento (ex.: uso opcional de localização do dispositivo). Você pode retirar o consentimento quando couber, sem prejuízo 
            da licitude do tratamento anterior.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">5. Armazenamento e Segurança</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Os dados são armazenados em infraestrutura segura (incluindo uso de serviços em nuvem, como Supabase), com medidas técnicas 
            e organizacionais para proteger contra acesso não autorizado, perda ou alteração. A comunicação com os nossos servidores 
            utiliza criptografia (HTTPS). Senhas não são armazenadas em texto puro.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">6. Compartilhamento de Dados</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Não vendemos seus dados pessoais. Podemos compartilhar dados apenas: (a) com prestadores de serviço que nos auxiliam na 
            operação da Plataforma (hospedagem, autenticação, analytics), sob contrato e em conformidade com a LGPD; (b) quando exigido 
            por lei ou ordem judicial; (c) para proteção dos nossos direitos e da segurança dos usuários. Dados agregados e anonimizados 
            podem ser utilizados para análises e melhorias do produto, sem identificação pessoal.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">7. Retenção</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Mantemos seus dados enquanto sua conta estiver ativa e conforme necessário para cumprir as finalidades descritas e obrigações 
            legais. Após o encerramento da conta, podemos reter dados por período necessário para cumprimento legal, resolução de disputas 
            e prevenção de abusos, após o que serão eliminados ou anonimizados.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">8. Seus Direitos (LGPD)</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Você tem direito a:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
            <li>Confirmar a existência de tratamento de dados.</li>
            <li>Acessar e corrigir dados incompletos, inexatos ou desatualizados.</li>
            <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.</li>
            <li>Revogar o consentimento, quando o tratamento tiver essa base.</li>
            <li>Solicitar a portabilidade dos dados a outro fornecedor de serviço.</li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            Para exercer esses direitos, utilize as configurações da conta na Plataforma ou entre em contato conosco pelo canal de suporte 
            disponível no aplicativo.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">9. Alterações</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Esta Política de Privacidade pode ser atualizada. Alterações relevantes serão comunicadas pela Plataforma ou por e-mail. 
            A continuação do uso após a publicação constitui aceitação da nova versão.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">10. Contato</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Para dúvidas, pedidos de acesso ou de exercício de direitos relativos aos seus dados pessoais, utilize o canal de suporte 
            disponível na Plataforma ou na tela de configurações do aplicativo.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-border">
          <Link
            to="/cadastro"
            className="text-primary font-medium hover:underline"
          >
            ← Voltar ao cadastro
          </Link>
        </div>
      </main>
    </div>
  );
}
