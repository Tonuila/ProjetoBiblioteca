package com.fag.biblioteca.controller;

import com.fag.biblioteca.model.Book;
import com.fag.biblioteca.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:8080")
public class BookController {
    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        logger.info("GET request received for /api/books");
        return bookService.getAllBooks();
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Book> updateBookStatus(@PathVariable Long id, @RequestParam String newStatus) {
        Book existingBook = bookService.getBookById(id).orElse(null);

        if (existingBook == null) {
            return ResponseEntity.notFound().build();
        }

        existingBook.setStatus(newStatus);

        Book savedBook = bookService.saveBook(existingBook);

        return ResponseEntity.ok(savedBook);
    }
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id).orElse(null);
    }

    @PostMapping
    public Book saveBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }
    
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        Book existingBook = bookService.getBookById(id).orElse(null);

        if (existingBook == null) {
            return ResponseEntity.notFound().build();
        }

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());

        Book savedBook = bookService.saveBook(existingBook);

        return ResponseEntity.ok(savedBook);
    }
}