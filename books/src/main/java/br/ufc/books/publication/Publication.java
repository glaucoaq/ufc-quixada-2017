package br.ufc.books.publication;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.AUTO;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import br.ufc.books.author.Author;
import br.ufc.books.publisher.Publisher;
import lombok.Data;

@Data
@Entity
public class Publication {

  @Id
  @GeneratedValue(strategy = AUTO)
  private Integer id;

  private String title;

  @Enumerated(STRING)
  private PublicationType publicationType;

  @Temporal(TemporalType.DATE)
  private Date publicationDate;

  @ManyToOne
  private Author author;

  @ManyToOne
  private Publisher publisher;

}
