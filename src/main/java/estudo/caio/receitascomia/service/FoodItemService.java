package estudo.caio.receitascomia.service;

import estudo.caio.receitascomia.DTO.FoodDTO;
import estudo.caio.receitascomia.model.FoodItem;
import estudo.caio.receitascomia.repository.FoodItemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodItemService {

    private final FoodItemRepository foodItemRepository;

    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    public List<FoodItem> listar() {
        return foodItemRepository.findAll();
    }

    public FoodDTO adicionarReceita(FoodDTO dto) {
        FoodItem foodItem = toEntity(dto);
        FoodItem salvo = foodItemRepository.save(foodItem);
        return toDTO(salvo);
    }

    // Métodos auxiliares de conversão (Mapper) entre DTO e Entity
    private FoodDTO toDTO(FoodItem item) {
        return new FoodDTO(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getQuantity(),
                item.getValidade()
        );
    }

    private FoodItem toEntity(FoodDTO dto) {
        FoodItem item = new FoodItem();
        item.setId(dto.id());
        item.setName(dto.name());
        item.setCategory(dto.category());
        item.setQuantity(dto.quantity());
        item.setValidade(dto.validade());
        return item;
    }
}