package ch.papasmurf.bm.backend.presentation

import ch.papasmurf.bm.backend.dal.TransactionRepository
import ch.papasmurf.bm.backend.dal.entity.Transaction
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.reactivex.Flowable
import io.reactivex.Single

/**
 * @author Matteo Codogno on 2019-01-28
 */
@Controller("/transactions")
class TransactionController(val repository: TransactionRepository) {

    @Get("/all")
    fun transactions() =
//    fun transactions() = Flowable.fromPublisher<List<Transaction>> {
        repository.getAll()
//    }.toList()

    @Post("/")
    fun addTransaction() = repository.addTransaction()
}
