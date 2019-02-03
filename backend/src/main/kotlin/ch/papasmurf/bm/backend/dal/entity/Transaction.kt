package ch.papasmurf.bm.backend.dal.entity

import org.bson.codecs.pojo.annotations.BsonCreator
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId
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

data class Transaction @BsonCreator constructor(
    @BsonId
    val id: ObjectId?,

    @BsonProperty("description")
    val description: String,
    @BsonProperty("amount")
    val amount: BigDecimal,
    @BsonProperty("currencyCode")
    val currencyCode: String = "CHF",
    @BsonProperty("invoiceDate")
    val invoiceDate: LocalDate = LocalDate.now(),
    @BsonProperty("user")
    val user: String = "Anonymous",
    @BsonProperty("expenseType")
    val expenseType: ExpensesTypes
)
