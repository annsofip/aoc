package main.kotlin.year2020.day01

import main.readInputLines
import main.readTestLines

fun main() {
    fun part1(input: List<String>): Int {
        return input.map { it.toInt() }
            .fold(0) { acc, number ->
                val diff = 2020 - number
                if (input.contains(diff.toString())) {
                    number * diff
                } else {
                    acc
                }
            }
    }

    fun part2(input: List<String>): Int {
        input.map { it.toInt() }.forEach { n: Int ->
            input.map { it.toInt() }.forEach { m: Int ->
                val diff = 2020 - n - m
                if (input.contains(diff.toString())) {
                    return n * m * diff
                }
            }
        }
        return 0
    }

    // test if implementation meets criteria from the description, like:
    val testInput = readTestLines("year2020/day01")
    println("test part1: " + part1(testInput))
    check(part1(testInput) == 514579)
    println("test part2: " + part2(testInput))

    val input = readInputLines("year2020/day01")
    println("part1: " + part1(input))
    println("part2: " + part2(input))
}