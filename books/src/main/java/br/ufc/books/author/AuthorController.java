package br.ufc.books.author;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URI;
import br.ufc.books.publication.Publication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authors")
public class AuthorController {

  @Autowired
  private AuthorRepository repository;

  @RequestMapping(method = GET)
  public Iterable<Author> getAll() {
    return repository.findAll();
  }

  @RequestMapping(method = GET, path = "{id}")
  public ResponseEntity<Author> getById(@PathVariable Integer id) {
    Author author = repository.findOne(id);

    if (author == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(author);
  }

  @RequestMapping(method = POST)
  public ResponseEntity<Void> createAuthor(@RequestBody Author info) {
    try {
      repository.save(info);
    } catch (DataIntegrityViolationException ex) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    URI createdUri = URI.create("/authors/" + info.getId().toString());
    return ResponseEntity.created(createdUri).build();
  }

  @RequestMapping(method = PUT, path = "{id}")
  public ResponseEntity<Void> updateAuthor(@PathVariable Integer id, @RequestBody Author info) {
    if (!id.equals(info.getId())) {
      return ResponseEntity.badRequest().build();
    }

    try {
      repository.save(info);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    return ResponseEntity.noContent().build();
  }

  @RequestMapping(method = DELETE, path = "{id}")
  public ResponseEntity<Void> removeAuthor(@PathVariable Integer id) {
    Author author = repository.findOne(id);
    if (author == null) {
      return ResponseEntity.notFound().build();
    }

    try {
      repository.delete(author);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    return ResponseEntity.noContent().build();
  }

  @RequestMapping("{id}/pubs")
  public ResponseEntity<Iterable<Publication>> getAuthorPublications(
      @PathVariable Integer id) {
    Author author = repository.findOne(id);
    if (author == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(author.getPublications());
  }

}
