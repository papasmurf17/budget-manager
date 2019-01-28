package ch.papasmurf.bm.backend.dal.entity

import java.math.BigDecimal
import java.time.LocalDate

/**
 * @author Matteo Codogno on 2019-01-28
 */
enum class ExpensesTypes(val value: String) {
    CREDIT("Credit"),
    CONFERENCE("Conference"),
    BOOK("Book"),
    VIDEO_COURSE("Video course"),
    HARDWARE("Hardware"),
    SOFTWARE("Software"),
    OTHER("Other")
}

data class Transaction(
    val description: String,
    val amount: BigDecimal,
    val currencyCode: String = "CHF",
    val invoiceDate: LocalDate = LocalDate.now(),
    val user: String = "Anonymous",
    val expenseType: ExpensesTypes
)
