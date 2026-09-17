# ReceitasComIA - Backend API
### Sobre o Projeto
>O ReceitasComIA é um microsserviço de backend desenvolvido para gerenciar itens de despensa/receitas e automatizar a geração de sugestões culinárias utilizando Inteligência Artificial generativa.
>
>O projeto foi construído com o objetivo de explorar a integração nativa de modelos de linguagem de grande escala (LLMs) em aplicações corporativas Java utilizando o ecossistema Spring AI, combinando persistência relacional/em memória e arquitetura baseada em microsserviços. 

>### Arquitetura e Decisões Técnicas
>>Spring Boot 3+: Escolhido pela maturidade no desenvolvimento de APIs RESTful e robustez no gerenciamento de injeção de dependências.
>
>>Spring AI: Abstração moderna para comunicação com provedores de IA, permitindo desacoplar a regra de negócio da API de IA utilizada (Google Gemini, OpenAI, DeepSeek).
>
>>H2 Database / JPA: Utilizado para persistência rápida e isolada em ambiente de desenvolvimento, facilitando o mapeamento objeto-relacional (ORM) de entidades e regras de validação.
>
>>Gerenciamento de Configuração: Propriedades externalizadas para fácil configuração de chaves de API e perfis de execução.

>### Endpoints Principais
>>GET /api/recipes - Lista todas as receitas cadastradas.
>
>>POST /api/recipes/generate - Aciona o serviço de IA para gerar uma nova receita com base nos parâmetros enviados.
>
>>CRUD de Itens - Gerenciamento completo de mantimentos e ingredientes base.

### Configuração e Execução
Clone o repositório:

>git clone https://github.com/SEU-USUARIO/ReceitasComIA.git
> 
Configure a chave de acesso da API de IA no arquivo src/main/resources/application.properties:

Obtenha sua chave no provedor de preferência (ex: Google AI Studio para Gemini, OpenAI ou DeepSeek).

Substitua o placeholder no arquivo de propriedades:

>Application.Properties
>>spring.ai.openai.api-key={SUA_CHAVE_AQUI}
>
>(ou a propriedade correspondente ao provedor configurado no Spring AI)

Execute a aplicação utilizando o Maven Wrapper:

>.\mvnw spring-boot:run
>
> 
> 
## Status do Projeto

->Backend: Concluído e estruturado para integração.

->Frontend: Em desenvolvimento (React + Vite).