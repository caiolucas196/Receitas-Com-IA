package estudo.caio.receitascomia.service;

import estudo.caio.receitascomia.dto.GerarReceitaRequest;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecipeAiService {

    private final ChatModel chatModel;

    public RecipeAiService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String gerarReceitaComIngredientesSelecionados(GerarReceitaRequest request) {
        if (request.getIngredientes() == null || request.getIngredientes().isEmpty()) {
            return "com o que você selecionou, não é possível gerar uma receita.";
        }

        // 1. Transforma a lista de ingredientes enviados pelo front-end em um texto estruturado
        String ingredientesStr = request.getIngredientes().stream()
                .map(ing -> ing.getQuantidade() + " " + ing.getUnidade() + " de " + ing.getNome())
                .collect(Collectors.joining(", "));

        // 2. System Prompt rígido (Anti-alucinação e Economia de Tokens)
        String systemPromptText =
                "Você é um assistente culinário robótico, extremamente frio, direto e focado em economia máxima de tokens. " +
                        "REGRAS OBRIGATÓRIAS:\n" +
                        "1. Utilize estritamente APENAS os ingredientes e quantidades fornecidos na lista do usuário. É expressamente PROIBIDO inventar ou alucinar ingredientes adicionais.\n" +
                        "2. Se os ingredientes fornecidos forem insuficientes, incompatíveis ou impossibilitarem o preparo de um prato real, retorne exatamente e unicamente esta frase, sem mais nada: 'com o que você selecionou, não é possível gerar uma receita'.\n" +
                        "3. Responda no formato estrito: 'receita: [nome do prato] / [ingredientes e quantidades usados] - [modo de preparo resumido em passos curtos]'.\n" +
                        "4. Não utilize saudações, introduções, explicações ou qualquer texto além do formato especificado.";

        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemPromptText);
        Message systemMessage = systemPromptTemplate.createMessage();

        // 3. Monta a mensagem do usuário com os itens escolhidos e a instrução extra (se houver)
        StringBuilder userContent = new StringBuilder("Ingredientes selecionados: " + ingredientesStr);
        if (request.getInstrucaoUsuario() != null && !request.getInstrucaoUsuario().isBlank()) {
            userContent.append(". Instrução extra: ").append(request.getInstrucaoUsuario());
        }
        UserMessage userMessage = new UserMessage(userContent.toString());

        // 4. Envia o prompt combinando as regras de sistema e a mensagem do usuário para o Gemini via Spring AI
        Prompt prompt = new Prompt(List.of(systemMessage, userMessage));

        return chatModel.call(prompt).getResult().getOutput().getContent();
    }
}