package ch.papasmurf.bm.backend.dal

import ch.papasmurf.bm.backend.dal.entity.ExpensesTypes
import ch.papasmurf.bm.backend.dal.entity.Transaction
import com.mongodb.reactivestreams.client.MongoClient
import java.math.BigDecimal
import javax.inject.Singleton

/**
 * @author Matteo Codogno on 2019-01-28
 */
@Singleton
class TransactionRepository(val mongoClient: MongoClient) {
    private fun repo() = mongoClient
        .getDatabase("bm")
        .getCollection("transactions", Transaction::class.java)

    fun addTransaction() = repo()
        .insertOne(
            Transaction(
            null,
            "Budget 2019",
            BigDecimal(20000),
            expenseType = ExpensesTypes.CREDIT,
            user = "WellD"
        ))!!

    fun getAll() = repo().find()!!
}
