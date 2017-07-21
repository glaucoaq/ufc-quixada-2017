package br.ufc.books.author;

import static javax.persistence.GenerationType.AUTO;

import java.util.Collection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import br.ufc.books.publication.Publication;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
public class Author {

  @Id
  @GeneratedValue(strategy = AUTO)
  private Integer id;

  private String firstName;

  private String lastName;

  private String email;

  @OneToMany(mappedBy = "author")
  @JsonIgnore
  private Collection<Publication> publications;

  public Author() {

  }
}
