# ReceitasComIA - Backend API
### Sobre o Projeto
> O ReceitasComIA é um microsserviço de backend desenvolvido para gerenciar itens de despensa/receitas e automatizar a geração de sugestões culinárias utilizando Inteligência Artificial generativa.
>
> O projeto foi construído com o objetivo de explorar a integração nativa de modelos de linguagem de grande escala (LLMs) em aplicações corporativas Java utilizando o ecossistema Spring AI, combinando persistência relacional/em memória e arquitetura baseada em microsserviços.

### Arquitetura e Decisões Técnicas
>> Spring Boot: Escolhido pela maturidade no desenvolvimento de APIs RESTful e robustez no gerenciamento de injeção de dependências.
>
>> Spring AI: Abstração moderna para comunicação com provedores de IA, permitindo desacoplar a regra de negócio da API de IA utilizada (Google Gemini).
>
>> H2 Database / JPA: Utilizado para persistência rápida e isolada em ambiente de desenvolvimento, facilitando o mapeamento objeto-relacional (ORM) de entidades e regras de validação.
>
>> Gerenciamento de Configuração: Propriedades externalizadas para fácil configuração de chaves de API e perfis de execução.

### Endpoints Principais
>> GET /api/food-items - Lista todos os itens da despensa cadastrados.
>
>> POST /api/recipes/generate - Aciona o serviço de IA para gerar uma nova receita com base nos parâmetros enviados.
>
>> CRUD de Itens - Gerenciamento completo de mantimentos e ingredientes base.

### Configuração e Execução
Clone o repositório:

> git clone https://github.com/caiolucas196/ReceitasComIA.git

Configure a chave de acesso da API de IA no arquivo src/main/resources/application.properties:

Obtenha sua chave no Google AI Studio para o Gemini.

Substitua o placeholder no arquivo de propriedades:

> Application.Properties
>> spring.ai.google.genai.api-key=SUA_CHAVE_AQUI

#### Execute a aplicação utilizando o Maven:

> mvn spring-boot:run

### Como Executar o Front-end

> 1. Navegue até o diretório do front-end via terminal.
>
> 2. Instale as dependências:
>> npm install
>
> 3. Inicialize o ambiente de desenvolvimento:
>> npm run dev

## Status do Projeto

-> Backend: Testado e estruturado para integração. (Podendo haver futuras alterações)

-> Frontend: Desenvolvido com React + Vite integrado ao backend. (Podendo haver futuras alterações)

## Autor

**Caio Lucas**
- E-mail: caiolucas196@hotmail.com
- GitHub: caiolucas196
- LinkedIn: caio-lfe