package estudo.caio.receitascomia.service;

import estudo.caio.receitascomia.dto.GerarReceitaRequest;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecipeAiService {

    private final ChatModel chatModel;

    // Forçamos o uso do Google GenAI (Gemini) através do @Qualifier
    public RecipeAiService(@Qualifier("googleGenAiChatModel") ChatModel chatModel) // ou "deepSeekChatModel" ou "googleGenAiChatModel"
     {
        this.chatModel = chatModel;
    }

    public String gerarReceitaComIngredientesSelecionados(GerarReceitaRequest request) {
        // Formata os ingredientes enviados pelo front-end em um texto claro
        String ingredientesStr = request.getIngredientes().stream()
                .map(i -> "- " + i.getNome() + ": " + i.getQuantidade() + " " + i.getUnidade())
                .collect(Collectors.joining("\n"));

        String instrucaoExtra = request.getInstrucaoUsuario() != null && !request.getInstrucaoUsuario().isEmpty()
                ? request.getInstrucaoUsuario()
                : "Nenhuma instrução adicional.";

        // Prompt estrito com regras "frias" e diretas exigidas
        String templateMensagem = """
            Você é um assistente culinário estrito e objetivo.
            Sua tarefa é criar uma receita baseada **EXCLUSIVAMENTE** nos ingredientes fornecidos abaixo.
            Proibido adicionar qualquer ingrediente que não esteja na lista.
            Mantenha o tom frio, direto e estritamente factual.
            
            Formato obrigatório da resposta:
            receita: [nome do prato] / [ingredientes e quantidades] - [modo de preparo passo a passo em até 3 frases].
            
            Ingredientes disponíveis na despensa:
            {ingredientes}
            
            Instrução do usuário:
            {instrucao}
            """;

        PromptTemplate promptTemplate = new PromptTemplate(templateMensagem);
        Map<String, Object> variaveis = new HashMap<>();
        variaveis.put("ingredientes", ingredientesStr);
        variaveis.put("instrucao", instrucaoExtra);

        Prompt prompt = promptTemplate.create(variaveis);

        // Dispara a chamada para o modelo de IA (Spring AI / Gemini)
        var resposta = chatModel.call(prompt);

        // Extrai o texto da resposta utilizando o metodo correto da API do Spring AI (.getText())
        if (resposta != null && resposta.getResult() != null && resposta.getResult().getOutput() != null) {
            return resposta.getResult().getOutput().getText();
        }

        return "Erro: A I.A. não retornou uma resposta válida.";
    }
}