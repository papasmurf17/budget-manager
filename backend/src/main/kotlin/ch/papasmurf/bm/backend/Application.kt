package ch.papasmurf.bm.backend

import io.micronaut.runtime.Micronaut

object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("ch/papasmurf/bm/backend")
                .mainClass(Application.javaClass)
                .start()
    }
}
