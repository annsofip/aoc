package main

import java.io.File
import java.math.BigInteger
import java.security.MessageDigest

/**
 * Reads lines from the given input txt file.
 * src/main/resources/year2020/day01/test.txt
 */
fun readInputLines(name: String) = File("src/main/resources/$name", "input.txt").readLines()
fun readInput(name: String) = File("src/main/resources/$name", "input.txt").readText()
fun readTestLines(name: String) = File("src/main/resources/$name", "test.txt").readLines()

/**
 * Converts string to main.md5 hash.
 */
fun String.md5(): String = BigInteger(1, MessageDigest.getInstance("MD5").digest(toByteArray())).toString(16)