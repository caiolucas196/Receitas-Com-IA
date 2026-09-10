// 2. Repository (FoodItemRepository.java)
package estudo.caio.receitascomia.repository;

import estudo.caio.receitascomia.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
}