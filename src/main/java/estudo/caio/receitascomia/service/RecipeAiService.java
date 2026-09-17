package estudo.caio.receitascomia.service;

import estudo.caio.receitascomia.model.FoodItem;
import estudo.caio.receitascomia.repository.FoodItemRepository;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeAiService {

    private final FoodItemRepository foodItemRepository;
    private final ChatModel chatModel;

    // O Spring injeta automaticamente o repositório do banco e o modelo de IA configurado
    public RecipeAiService(FoodItemRepository foodItemRepository, ChatModel chatModel) {
        this.foodItemRepository = foodItemRepository;
        this.chatModel = chatModel;
    }

    public String gerarReceitaComIngredientesDaGeladeira() {
        // 1. Busca todos os alimentos cadastrados no banco H2
        List<FoodItem> itens = foodItemRepository.findAll();

        if (itens.isEmpty()) {
            return "Não há ingredientes cadastrados na base para gerar uma receita.";
        }

        // 2. Transforma a lista de itens em um texto legível para a IA
        String ingredientesStr = itens.stream()
                .map(item -> item.getQuantity() + " " + item.getUnit() + " de " + item.getName())
                .collect(Collectors.joining(", "));

        // 3. Monta o Prompt inteligente
        String prompt = "Com base estritamente nos seguintes ingredientes que tenho disponíveis em casa: "
                + ingredientesStr
                + ". Crie uma receita criativa, informando o nome da receita, os passos do modo de preparo "
                + "e utilize apenas o que tenho disponível (ou itens básicos como água e sal se estritamente necessário).";

        // 4. Envia para o Gemini via Spring AI e retorna a resposta gerada
        return chatModel.call(prompt);
    }
}