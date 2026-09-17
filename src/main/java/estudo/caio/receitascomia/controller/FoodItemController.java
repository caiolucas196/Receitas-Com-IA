package estudo.caio.receitascomia.controller;

import estudo.caio.receitascomia.DTO.FoodDTO;
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
    private final RecipeAiService recipeAiService; // 1. Declarar a variável do service da IA

    // 0. Injetar ambos os services pelo construtor unificado
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

    // 2. READ - Listar todos
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

    // 6. GET para a I.A preparar a receita
    @GetMapping("/gerar-receita")
    public ResponseEntity<String> gerarReceita() {
        // 3. Chamar usando a INSTÂNCIA (recipeAiService com letra minúscula)
        String receita = recipeAiService.gerarReceitaComIngredientesDaGeladeira();
        return ResponseEntity.ok(receita);
    }
}