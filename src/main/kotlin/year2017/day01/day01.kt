package main.kotlin.year2017.day01

import main.readInput
import main.readInputLines

fun main() {
    fun part1(input: String): Int {
        val chars = input.toCharArray()
        var sum: Int = 0
        for ((index, value) in chars.withIndex()) {
            val nextIndex = if (index + 1 < chars.size) index + 1 else 0
            if (value == chars.get(nextIndex))
                sum = sum.plus(value.digitToInt())
        }
        return sum
    }

    fun part2(input: String): Int {
        val chars = input.toCharArray()
        var sum: Int = 0
        val stepLength = chars.size / 2
        for ((index, value) in chars.withIndex()) {
            val nextIndex =
                if (index + stepLength < chars.size) index + stepLength else  chars.size - (index + stepLength)

            if (value == chars.get(nextIndex))
                sum = sum.plus(value.digitToInt())
        }
        return sum
    }

    // test if implementation meets criteria from the description, like:
    val testInput1 = "1122"
    val testInput2 = "1111"
    val testInput3 = "1234"
    val testInput4 = "91212129"
    println("test1 part1: " + part1(testInput1))
    println("test1 part1: " + part1(testInput2))
    println("test1 part1: " + part1(testInput3))
    println("test1 part1: " + part1(testInput4))
    check(part1(testInput1) == 3)
    check(part1(testInput2) == 4)
    check(part1(testInput3) == 0)
    check(part1(testInput4) == 9)

    val testInput6 = "1212"
    val testInput7 = "1221"
    val testInput8 = "123425"
    val testInput9 = "123123"
    val testInput10 = "12131415"
    println("test1 part2: " + part2(testInput6))
    println("test2 part2: " + part2(testInput7))
    println("test3 part2: " + part2(testInput8))
    println("test4 part2: " + part2(testInput9))
    println("test5 part2: " + part2(testInput10))
    check(part2(testInput6) == 6)
    check(part2(testInput7) == 0)
    check(part2(testInput8) == 4)
    check(part2(testInput9) == 12)
    check(part2(testInput10) == 4)

    //println("test part2: " + part2(testInput))

    val input = readInput("year2017/day01")
    println("part1: " + part1(input))
    // println("part2: " + part2(input))
}