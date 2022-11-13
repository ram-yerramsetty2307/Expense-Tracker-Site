package com.ETS.Repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ETS.Models.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	List<Expense> findByUserId(Long userId);
	List<Expense> findByUserIdAndCategory(Long userId, String category);
	List<Expense> findByUserIdAndDateBetween(Long userId, Date startdate, Date enddate);
 
}
