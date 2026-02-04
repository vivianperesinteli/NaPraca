import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermosDeUso() {
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
          <h1 className="font-display font-bold text-lg text-foreground">Termos de Uso</h1>
        </div>
      </header>

      <main className="px-4 py-6 pb-12 max-w-2xl mx-auto prose prose-sm prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground text-xs mb-6">
          Última atualização: Janeiro de 2026. Versão 1.0.
        </p>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">1. Aceitação dos Termos</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ao acessar ou utilizar o aplicativo e a plataforma NaPraça (“Plataforma”), você concorda com estes Termos de Uso. 
            Se não concordar, não utilize nossos serviços. A NaPraça é uma plataforma que conecta microempreendedores (MEIs) 
            e consumidores locais, oferecendo vitrine digital para negócios, educação gamificada em gestão e descoberta do comércio de bairro.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">2. Descrição do Serviço</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            A NaPraça oferece, entre outros:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mb-2">
            <li><strong className="text-foreground">Para empreendedores:</strong> cadastro e divulgação do negócio em mapa inteligente, missões educativas em gestão, analytics de visualizações, publicação de catálogo e feed.</li>
            <li><strong className="text-foreground">Para consumidores:</strong> mapa para descobrir negócios locais, perfil dos estabelecimentos, ofertas, programa de pontos e recompensas, e comunidade de apoio ao comércio local.</li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Os serviços podem ser alterados ou ampliados a qualquer momento, com ou sem aviso prévio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">3. Cadastro e Conta</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            É necessário criar uma conta (e-mail e senha) e informar dados verdadeiros. Você é responsável por manter a confidencialidade 
            da senha e por todas as atividades realizadas em sua conta. Ao se cadastrar como empreendedor, você pode cadastrar um ou mais 
            negócios; como consumidor, pode explorar o mapa, favoritar negócios e participar do programa de recompensas. Não é permitido 
            criar contas falsas, usar dados de terceiros sem autorização ou violar leis aplicáveis.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">4. Uso Aceitável</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Você concorda em utilizar a Plataforma de forma lícita e ética. É proibido:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
            <li>Publicar informações falsas, ofensivas ou ilegais sobre negócios ou pessoas.</li>
            <li>Usar a Plataforma para spam, fraude ou práticas enganosas.</li>
            <li>Tentar acessar dados ou sistemas de outros usuários ou da NaPraça sem autorização.</li>
            <li>Reproduzir, copiar ou revender o serviço sem autorização.</li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            O descumprimento pode resultar em suspensão ou exclusão da conta.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">5. Conteúdo e Propriedade</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            O conteúdo que você publica (fotos, textos, dados do negócio, publicações no feed) continua sendo de sua responsabilidade. 
            Você concede à NaPraça a licença necessária para exibir, armazenar e processar esse conteúdo no âmbito do serviço. 
            A NaPraça não se responsabiliza pelo conteúdo publicado pelos usuários, mas pode remover conteúdo que viole estes termos ou a lei.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">6. Limitação de Responsabilidade</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A Plataforma é oferecida “como está”. A NaPraça não garante resultados comerciais para empreendedores nem a disponibilidade 
            ininterrupta do serviço. Não nos responsabilizamos por negociações, acordos ou transações realizadas diretamente entre 
            usuários fora da Plataforma, nem por danos indiretos decorrentes do uso ou da impossibilidade de uso dos serviços.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">7. Alterações</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Estes Termos de Uso podem ser alterados a qualquer momento. Alterações relevantes serão comunicadas por meio da Plataforma 
            ou por e-mail. O uso continuado após a publicação das alterações constitui aceitação dos novos termos.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">8. Lei Aplicável e Foro</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Estes termos são regidos pelas leis da República Federativa do Brasil. Eventuais disputas serão submetidas ao foro da 
            comarca do domicílio do usuário, com renúncia a qualquer outro, por mais privilegiado que seja.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display font-bold text-foreground text-base mt-4 mb-2">9. Contato</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Dúvidas sobre estes Termos de Uso podem ser enviadas pelo canal de suporte disponível na Plataforma ou pela tela de configurações.
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
