package backend

import io.micronaut.runtime.Micronaut

object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("backend")
                .mainClass(Application.javaClass)
                .start()
    }
}