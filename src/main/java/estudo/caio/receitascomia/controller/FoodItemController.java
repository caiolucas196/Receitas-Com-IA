package estudo.caio.receitascomia.controller;

import estudo.caio.receitascomia.dto.FoodDTO;
import estudo.caio.receitascomia.dto.GerarReceitaRequest; // Import do DTO que criamos
import estudo.caio.receitascomia.service.FoodItemService;
import estudo.caio.receitascomia.service.RecipeAiService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@CrossOrigin(origins = "*")
public class FoodItemController {

    private final FoodItemService foodItemservice;
    private final RecipeAiService recipeAiService;

    public FoodItemController(FoodItemService foodItemservice, RecipeAiService recipeAiService) {
        this.foodItemservice = foodItemservice;
        this.recipeAiService = recipeAiService;
    }

    @GetMapping("/boasVindas")
    public String boasVindas() {
        return "Bem vindos ao projeto Receitas com IA! :)";
    }

    // 1. CREATE - Adicionar alimento
    @PostMapping("/adicionar")
    public ResponseEntity<FoodDTO> adicionarReceita(@RequestBody @Valid FoodDTO foodDTO) {
        FoodDTO foodCreate = foodItemservice.adicionarReceita(foodDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(foodCreate);
    }

    // 2. READ - Listar todos (Usado para popular a seleção no front-end)
    @GetMapping("/listar")
    public ResponseEntity<List<FoodDTO>> listarReceitas() {
        return ResponseEntity.status(HttpStatus.OK).body(foodItemservice.listar());
    }

    // 3. READ - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> buscarPorId(@PathVariable Long id) {
        FoodDTO foodDTO = foodItemservice.buscarPorId(id);
        return ResponseEntity.ok(foodDTO);
    }

    // 4. UPDATE - Atualizar por ID
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<FoodDTO> atualizar(@PathVariable Long id, @RequestBody @Valid FoodDTO foodDTO) {
        FoodDTO atualizado = foodItemservice.atualizar(id, foodDTO);
        return ResponseEntity.ok(atualizado);
    }

    // 5. DELETE - Deletar por ID
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        foodItemservice.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // 6. POST para a I.A preparar a receita com base nos itens selecionados no front-end
    @PostMapping("/gerar-receita")
    public ResponseEntity<String> gerarReceita(@RequestBody GerarReceitaRequest request) {
        String receita = recipeAiService.gerarReceitaComIngredientesSelecionados(request);
        return ResponseEntity.ok(receita);
    }

    //7.VALIDAÇÃO DE KEY
    @GetMapping("/status-ai")
    public ResponseEntity<Boolean> verificarStatusAi() {
        try {
            // Envia uma mensagem mínima de teste para a IA
            String resposta = recipeAiService.testarConexaoSimples(); // método rápido que retorna uma string curta
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

}