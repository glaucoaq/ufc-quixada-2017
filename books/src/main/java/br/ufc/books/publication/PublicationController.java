package br.ufc.books.publication;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pubs")
public class PublicationController {
  @Autowired
  private PublicationRepository repository;

  @RequestMapping(method = GET)
  public Iterable<Publication> getAll() {
    return repository.findAll();
  }

  @RequestMapping(method = GET, path = "{id}")
  public ResponseEntity<Publication> getById(@PathVariable Integer id) {
    Publication publication = repository.findOne(id);

    if (publication == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(publication);
  }

  @RequestMapping(method = POST)
  public ResponseEntity<Void> createPublication(@RequestBody Publication info) {
    try {
      repository.save(info);
    } catch (DataIntegrityViolationException ex) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    URI createdUri = URI.create("/publications/" + info.getId().toString());
    return ResponseEntity.created(createdUri).build();
  }

  @RequestMapping(method = PUT, path = "{id}")
  public ResponseEntity<Void> updatePublication(@PathVariable Integer id, @RequestBody Publication info) {
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
  public ResponseEntity<Void> removePublication(@PathVariable Integer id) {
    Publication publication = repository.findOne(id);
    if (publication == null) {
      return ResponseEntity.notFound().build();
    }

    try {
      repository.delete(publication);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    return ResponseEntity.noContent().build();
  }
}
